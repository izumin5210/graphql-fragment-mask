import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { FragmentDefinitionNode, InlineFragmentNode } from "graphql";

export function maskWithFragment<TFilteredData extends Record<string, unknown>, TData extends TFilteredData>(
  doc: TypedDocumentNode<TData, any>,
  input: TData
): TFilteredData {
  if (doc.definitions[0]?.kind !== "FragmentDefinition") {
    throw new Error("input document should be fragment definition");
  }
  const entryFragmentDef = doc.definitions[0];

  const fragmentDefMap: Record<string, FragmentDefinitionNode> = {};
  for (const def of doc.definitions) {
    if (def.kind === "FragmentDefinition") {
      fragmentDefMap[def.name.value] = def;
    }
  }

  return extractFields(entryFragmentDef.selectionSet, input, fragmentDefMap) as TFilteredData;
}

function extractFields(
  selectionSet: FragmentDefinitionNode["selectionSet"] | InlineFragmentNode["selectionSet"],
  input: Record<string, unknown>,
  fragmentDefMap: Record<string, FragmentDefinitionNode>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const sel of selectionSet.selections) {
    switch (sel.kind) {
      case "Field": {
        const key = sel.name.value;
        if (!(key in input)) throw new Error(`field \`${key}\` does not found`);
        const value = input[sel.name.value];
        const selectionSet = sel.selectionSet;
        if (selectionSet) {
          if (Array.isArray(value)) {
            result[key] = value.map((v) => extractFields(selectionSet, v, fragmentDefMap));
          } else {
            result[key] = extractFields(selectionSet, value as any, fragmentDefMap);
          }
        } else {
          result[key] = value;
        }
        break;
      }
      case "FragmentSpread": {
        const fragment = fragmentDefMap[sel.name.value];
        if (fragment == null) throw new Error(`fragment \`${sel.name.value}\` does not found`);
        Object.assign(result, extractFields(fragment.selectionSet, input, fragmentDefMap));
        break;
      }
      case "InlineFragment": {
        Object.assign(result, extractFields(sel.selectionSet, input, fragmentDefMap));
        break;
      }
      default: {
        const _exhaustiveCheck: never = sel;
        break;
      }
    }
  }

  return result;
}
