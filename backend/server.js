//server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
	.connect("mongodb+srv://rakshitharakshitha6242:raksh@cluster0.rdl2otz.mongodb.net/food-delivery-app", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to db"))
	.catch((err) => console.log("Error connecting to db", err));

const restaurantSchema = new mongoose.Schema({
	name: String,
	image: String,
	menu: [
		{
			name: String,
			price: Number,
			image: String,
		},
	],
	rating: Number,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Define the PreviousOrder schema
const previousOrderSchema = new mongoose.Schema({
	orderId: { type: String, required: true },
	dateOfOrder: { type: Date, required: true },
	amount: { type: Number, required: true },
});

const PreviousOrder = mongoose.model("PreviousOrder", previousOrderSchema);

// Seed initial data
const seedData = [
	{
		name: "North Indian",
		image: "https://assets.vogue.com/photos/6352ccb841ea2bd565be085f/master/w_2560%2Cc_limit/GettyImages-1223580360.jpg",
		menu: [
			{
				name: "Rajma Chawal",
				price: 200,
				image: 
"https://th.bing.com/th/id/OIP.ok9cTLhwnkBChAWD30GBJwHaHa?rs=1&pid=ImgDetMain",
			},
			{
				name: "Curry",
				price: 150,
				image: 
"https://www.archanaskitchen.com/images/archanaskitchen/1-Author/priyanjali/shutterstock_111998606.jpg",
			},
			{
				name: "Kadai Panner",
				price: 250,
				image: 
"https://3.bp.blogspot.com/-5tyQAHZqbvk/W4zNaXPoLqI/AAAAAAAAOm8/O9351uOTG8gTHGQrioBmmtRGoF4_CaVQQCLcBGAs/s1600/DSC_0409.JPG",
			},
		],
		rating: 5,
	},
	{
		name: "South Indian ",
		image: 
"https://i.redd.it/bk7gvxvesbk61.jpg",
		menu: [
			{
				name: "Idli",
				price: 120,
				image: 
"https://www.healthifyme.com/blog/wp-content/uploads/2018/03/idly2.jpeg",
			},
			{
				name: "Checken Biriyani",
				price: 180,
				image: 
"https://th.bing.com/th/id/OIP.Q4f5lR46RdwAqe9hXJ7dlAHaF7?rs=1&pid=ImgDetMain",
			},
			{
				name: "Prawns fry",
				price: 250,
				image: 
"https://th.bing.com/th/id/R.740f83cfd01c99b0196bca1d94646613?rik=lxRAYT1nXu1FCw&riu=http%3a%2f%2fyourcookingpal.com%2fwp-content%2fuploads%2f2015%2f10%2fprawns-fry-1.jpg&ehk=0FCfQjNBV6TtpYOp9%2bE2SGmlde0tlSOIrWvJkssRxPI%3d&risl=&pid=ImgRaw&r=0",
			},
		],
		rating: 4.6,
	},
	{
		name: "Gujrathi",
		image: "https://fashionablefoodz.com/wp-content/uploads/2017/11/Gujarati-Food-1.jpg",
		menu: [
			{
				name: "Fafda and Dhokla",
				price: 80,
				image: 
"https://pandareviewz.com/wp-content/uploads/2019/03/Khandvi-gujarati-snack.png",
			},
			{
				name: "Dabeli",
				price: 125,
				image: 
"https://i0.wp.com/www.cookingfromheart.com/wp-content/uploads/2017/06/Kutchi-Dabeli-4.jpg?resize=1024%2C683",
			},
			{
				name: "Lilva Kachori",
				price: 160,
				image: 
"https://www.nehascookbook.com/wp-content/uploads/2020/11/Lilva-kachori-WS-1068x601.jpg",
			},
		],
		rating: 4.1,
	},
	{
		name: "American",
		image: "https://th.bing.com/th/id/OIP.KER40bALR4E868yp0Z4C4wHaE8?rs=1&pid=ImgDetMain",
		menu: [
			{
				name: "Hot Dog",
				price: 220,
				image: "https://potatorolls.com/wp-content/uploads/2020/10/Basic-Hot-Dogs.jpg",
			},
			{
				name: "Ham Burger",
				price: 180,
				image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
			},
			{
				name: "Sandwiches",
				price: 250,
				image: "https://th.bing.com/th/id/OIP.ZFC47OQxG2_G5CwhE8fvdgHaE8?rs=1&pid=ImgDetMain",
			},
		],
		rating: 3.2,
	},
	{
		name: "Chinese",
		image: "https://wallpaperaccess.com/full/1401021.jpg",
		menu: [
			{
				name: "Chow Mein",
				price: 269,
				image: "https://laurenslatest.com/wp-content/uploads/2021/04/chow-mein-12-scaled.jpg",
			},
			{
				name: "Spring Roll",
				price: 155,
				image: "https://nutritionaustralia.org/app/uploads/2015/05/Spring-rolls-scaled.jpg",
			},
			{
				name: "Wonton Soap",
				price: 189,
				image: "https://th.bing.com/th/id/R.4b793cc10fcab205b85563c42d665cf7?rik=hg453bpYYXXUJA&riu=http%3a%2f%2fcarlsbadcravings.com%2fwp-content%2fuploads%2f2018%2f11%2fwonton-soup-11.jpg&ehk=tGsEMcOM91utMfvlbQlofV05SYj4ZUiKJ2vbkhZKQ8E%3d&risl=&pid=ImgRaw&r=0",
			},
		],
		rating: 4.0,
	},
];

const seedDatabase = async () => {
	try {
		await Restaurant.deleteMany(); // Clear existing data
		await Restaurant.insertMany(seedData);
		console.log("Database seeded successfully.");
	} catch (error) {
		console.error("Error seeding the database:", error.message);
	}
};

// Seed data when the server starts
seedDatabase();

// Insert dummy data when the server starts
const insertDummyData = async () => {
	try {
		const existingOrders = await PreviousOrder.find();

		// Insert dummy data only if the database is empty
		if (existingOrders.length === 0) {
			const dummyOrders = [
				{ orderId: "001", dateOfOrder: new Date(), amount: 30 },
				{ orderId: "002", dateOfOrder: new Date(), amount: 45 },
				// Add more dummy orders as needed
			];

			await PreviousOrder.insertMany(dummyOrders);
			console.log("Dummy data inserted successfully!");
		}
	} catch (error) {
		console.error("Error inserting dummy data:", error);
	}
};
insertDummyData();

app.get("/restaurants", async (req, res) => {
	try {
		// Use the 'find' method of the 'Restaurant' model to retrieve all restaurants
		const restaurants = await Restaurant.find({});

		// Send the retrieved restaurants as a JSON response
		res.json(restaurants);
	} catch (error) {
		// Handle any errors that may occur during the process and send a 500 Internal Server Error response
		res.status(500).json({ error: error.message });
	}
});

// Endpoint to retrieve previous orders
app.get("/previousOrders", async (req, res) => {
	try {
		const orders = await PreviousOrder.find();
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
});
// Endpoint to save order data
app.post("/previousOrders", async (req, res) => {
	try {
		const { orderId, dateOfOrder, amount } = req.body;

		console.log(orderId, dateOfOrder, amount);

		const newOrder = new PreviousOrder({
			orderId,
			dateOfOrder: new Date(dateOfOrder),
			amount,
		});

		await newOrder.save();
		res.status(201).json({ message: "Dummy order saved successfully!" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
