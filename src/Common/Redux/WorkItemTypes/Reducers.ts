import { LoadStatus } from "Common/Contracts";
import { WorkItemTypeActions, WorkItemTypeActionTypes } from "Common/Redux/WorkItemTypes/Actions";
import { defaultState, IWorkItemTypeState } from "Common/Redux/WorkItemTypes/Contracts";
import { toDictionary } from "Common/Utilities/Array";
import { produce } from "immer";

export function workItemTypeReducer(state: IWorkItemTypeState | undefined, action: WorkItemTypeActions): IWorkItemTypeState {
    return produce(state || defaultState, draft => {
        switch (action.type) {
            case WorkItemTypeActionTypes.BeginLoad: {
                draft.status = LoadStatus.Loading;
                draft.workItemTypes = undefined;
                draft.workItemTypesMap = undefined;
                draft.error = undefined;
                break;
            }

            case WorkItemTypeActionTypes.LoadFailed: {
                draft.error = action.payload;
                draft.workItemTypes = undefined;
                draft.workItemTypesMap = undefined;
                draft.status = LoadStatus.LoadFailed;
                break;
            }

            case WorkItemTypeActionTypes.LoadSucceeded: {
                const workItemTypes = action.payload;
                draft.workItemTypes = workItemTypes;
                draft.workItemTypesMap = toDictionary(workItemTypes, w => w.name.toLowerCase(), w => w);
                draft.status = LoadStatus.Ready;
                draft.error = undefined;
            }
        }
    });
}
