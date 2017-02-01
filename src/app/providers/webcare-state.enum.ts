export class WebcareState {
    static Assigned: string = "assignedto";
    static Completed: string = "discard";
    static Open: string = "false";
    static RepliedTo: string = "responded";
    static Saved: string = "saved";
    static MarkedAsSpam: string = "true";
    static WaitingForApproval: string = "approval";

    static getEnumValue(state: string): number {
        switch (state) {
            case WebcareState.Assigned:
                return WebcareStateEnum.Assigned;
            case WebcareState.Completed:
                return WebcareStateEnum.Completed;
            case WebcareState.Open:
                return WebcareStateEnum.Open;
            case WebcareState.RepliedTo:
                return WebcareStateEnum.RepliedTo;
            case WebcareState.Saved:
                return WebcareStateEnum.Saved;
            case WebcareState.MarkedAsSpam:
                return WebcareStateEnum.MarkedAsSpam;
            case WebcareState.WaitingForApproval:
                return WebcareStateEnum.WaitingForApproval;
        }
        return undefined;
    }

    static getStringValue(number: number): string {
        switch (number) {
            case WebcareStateEnum.Assigned:
                return WebcareState.Assigned;
            case WebcareStateEnum.Completed:
                return WebcareState.Completed;
            case WebcareStateEnum.Open:
                return WebcareState.Open;
            case WebcareStateEnum.RepliedTo:
                return WebcareState.RepliedTo;
            case WebcareStateEnum.Saved:
                return WebcareState.Saved;
            case WebcareStateEnum.MarkedAsSpam:
                return WebcareState.MarkedAsSpam;
            case WebcareStateEnum.WaitingForApproval:
                return WebcareState.WaitingForApproval;
        }
        return undefined;
    }
}

export enum WebcareStateEnum {
    Open = 0,
    Completed = 1,
    RepliedTo = 2,
    Saved = 3,
    Assigned = 4,
    MarkedAsSpam = 5,
    WaitingForApproval = 6
}