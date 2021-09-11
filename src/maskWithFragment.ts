import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { FragmentDefinitionNode, InlineFragmentNode } from "graphql";
import deepMerge from "deepmerge";

export function maskWithFragment<TFilteredData extends Record<string, unknown>, TData extends TFilteredData>(
  doc: TypedDocumentNode<TFilteredData, any>,
  input: TData
): TFilteredData;
export function maskWithFragment<TFilteredData extends Record<string, unknown>, TData extends TFilteredData>(
  doc: TypedDocumentNode<TFilteredData, any>,
  input: ReadonlyArray<TData>
): ReadonlyArray<TFilteredData>;
export function maskWithFragment<TFilteredData extends Record<string, unknown>, TData extends TFilteredData>(
  doc: TypedDocumentNode<TFilteredData, any>,
  input: TData | ReadonlyArray<TData>
): TFilteredData | ReadonlyArray<TFilteredData> {
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

  if (Array.isArray(input)) {
    return input.map((v) => extractFields(entryFragmentDef, v, fragmentDefMap) as TData);
  }
  return extractFields(entryFragmentDef, input as TData, fragmentDefMap) as TFilteredData;
}

function extractFields(
  fragmentDef: FragmentDefinitionNode | InlineFragmentNode,
  input: Record<string, unknown>,
  fragmentDefMap: Record<string, FragmentDefinitionNode>
): Record<string, unknown> {
  if (fragmentDef.typeCondition) {
    const wantType = fragmentDef.typeCondition.name.value;
    if (!("__typename" in input)) {
      throw new Error(`\`__typename\` is required in inline fragment ${wantType}`);
    }
    if (wantType !== (input as any).__typename) {
      return {};
    }
  }
  return extractFieldsFromSelections(fragmentDef.selectionSet, input, fragmentDefMap);
}

function extractFieldsFromSelections(
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
            result[key] = value.map((v) => extractFieldsFromSelections(selectionSet, v, fragmentDefMap));
          } else {
            result[key] = deepMerge(
              (result[key] as any) ?? {},
              extractFieldsFromSelections(selectionSet, value as any, fragmentDefMap)
            );
          }
        } else {
          result[key] = value;
        }
        if ("__typename" in input) {
          (result as any).__typename = (input as any).__typename;
        }
        break;
      }
      case "FragmentSpread": {
        const fragment = fragmentDefMap[sel.name.value];
        if (fragment == null) throw new Error(`fragment \`${sel.name.value}\` does not found`);
        result = deepMerge(result, extractFields(fragment, input, fragmentDefMap));
        break;
      }
      case "InlineFragment": {
        result = deepMerge(result, extractFields(sel, input, fragmentDefMap));
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
