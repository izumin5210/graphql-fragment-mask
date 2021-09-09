import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { FragmentDefinitionNode, InlineFragmentNode } from "graphql";
import deepMerge from "deepmerge";

type AnyObject = Record<string, unknown>;
type Superset<T extends AnyObject> = T & AnyObject;

export function maskWithFragment<TData extends AnyObject>(
  doc: TypedDocumentNode<TData, any>,
  input: Superset<TData>
): TData {
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

  return extractFields(entryFragmentDef.selectionSet, input, fragmentDefMap) as TData;
}

function extractFields(
  selectionSet: FragmentDefinitionNode["selectionSet"] | InlineFragmentNode["selectionSet"],
  input: Record<string, unknown>,
  fragmentDefMap: Record<string, FragmentDefinitionNode>
): Record<string, unknown> {
  let result: Record<string, unknown> = {};

  for (const sel of selectionSet.selections) {
    switch (sel.kind) {
      case "Field": {
        const key = (sel.alias ?? sel.name).value;
        if (!(key in input)) throw new Error(`field \`${key}\` does not found`);
        const value = input[key];
        const selectionSet = sel.selectionSet;
        if (selectionSet) {
          if (Array.isArray(value)) {
            result[key] = value.map((v) => extractFields(selectionSet, v, fragmentDefMap));
          } else {
            result[key] = deepMerge(
              (result[key] as any) ?? {},
              extractFields(selectionSet, value as any, fragmentDefMap)
            );
          }
        } else {
          result[key] = value;
        }
        break;
      }
      case "FragmentSpread": {
        const fragment = fragmentDefMap[sel.name.value];
        if (fragment == null) throw new Error(`fragment \`${sel.name.value}\` does not found`);
        result = deepMerge(result, extractFields(fragment.selectionSet, input, fragmentDefMap));
        break;
      }
      case "InlineFragment": {
        result = deepMerge(result, extractFields(sel.selectionSet, input, fragmentDefMap));
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
