const Agent = require('../models/Agent');

// Create a new  Post
exports.createAgent = async (req, res) => {
    console.log("agent");
    
  try {
    const {
        userId,
        firstName,
        lastName,
      email,
      companyName,
      phoneNumber,
      productInterest,
    } = req.body;

    // Store image paths
    const images = req.files.map((file) => file.path);

    const agent = new Agent({
        userId,
        firstName,
        lastName,
      email,
      companyName,
      phoneNumber,
      productInterest,
      images,
    });

    const agents = await agent.save();
    res.status(201).json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Error creating stone post', error });
  }
};
exports.getAllAgent = async (req, res) => {
    try {
      const agent = await Agent.find();
      res.status(200).json(agent);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching catering posts', error });
    }
  };


//   exports.getUserStoneData = async (req, res) => {
//     console.log("getuserdata");
    
//     try {
//       // Fetch stone based on the extracted userId
//       const userId=req.userId
      
//       const stone = await Stone.find({ userId: userId });
//     //   console.log(stone);
      
//       res.status(200).json(stone);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching houses data" });
//     }
//   };