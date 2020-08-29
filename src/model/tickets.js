export class Ticket {
    constructor(title, description, sender_id, recipient_id, manager_id, operator_id, fromAds, comment, status, id) {
        this.title = title;
        this.description = description;
        this.sender_id = sender_id;
        this.recipient_id = recipient_id;
        this.manager_id = manager_id;
        this.operator_id = operator_id;
        this.fromAds = fromAds;
        this.comment = comment;
        this.status = status;
        this.id = id;
    }
}
