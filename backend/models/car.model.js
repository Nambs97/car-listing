module.exports = mongoose => {
    const Car = mongoose.model(
        "Car",
        mongoose.Schema(
            {
                title: String,
                description: String
            },
            { 
                timestamps: true,
                collection: 'cars'
            }
        )
    );
    return Car;
};