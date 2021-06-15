module.exports = mongoose => {
    const Comment = mongoose.model(
        "Comment",
        mongoose.Schema(
            {
                user_id: String,
                car_id: String,
                content: String
            },
            { 
                timestamps: true,
                collection: 'comments'
            }
        )
    );
    return Comment;
};