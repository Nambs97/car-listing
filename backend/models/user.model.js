module.exports = mongoose => {
    const User = mongoose.model(
        "User",
        mongoose.Schema(
            {
                username: String,
                password: String
            },
            { 
                timestamps: true,
                collection: 'users'
            }
        )
    );
    return User;
};