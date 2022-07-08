class consultationReq {
    constructor(consultationId,undergradFName,undergradLName, batch, faculty,email,sessionDate,sessionTime,consultantFName,consultantLName) {
        this.consultationId=consultationId;
        this.undergradFName = undergradFName;
        this.undergradLName = undergradLName;
        this.batch=batch;
        this.faculty=faculty;
        this.sessionDate=sessionDate;
        this.sessionTime=sessionTime;
        this.consultantFName=consultantFName;
        this.consultantLName=consultantLName;

    }
}

module.exports = consultationReq;