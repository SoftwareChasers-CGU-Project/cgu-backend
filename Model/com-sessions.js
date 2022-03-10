class comSession {
    constructor(sessionId,sessionTopic,sessionDate,sessionDesc,TargetGroup,companyId) {
        this.sessionId=sessionId;
        this.sessionTopic = sessionTopic;
        this.sessionDate = sessionDate;
        this.sessionDesc=sessionDesc;
        this.TargetGroup=TargetGroup;
        this.companyId=companyId;

    }
}

module.exports = comSession;