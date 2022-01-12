const User = require('../../models/User');
const Artist = require('../../models/Artist');
const Service = require('../../models/Service');
const Album=require('../../models/Album');
const Razorpay = require('razorpay');
const request = require('request');
const { nanoid } = require('nanoid');

const razorInstance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
})

//Get an artist
exports.getArtist=async(req,res)=>{
  try {
    const artist=await Artist.findOne({_id:req.params.artistId});
    res.status(200).send(artist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

//Order
exports.order = async (req, res) => {
  try {
    const { amount } = req.params;
    const options = {
      amount: parseInt(amount) * 100,
      currency: "INR",
      receipt: nanoid(),
      payment_capture: 0, //1

    };
    razorInstance.orders.create(options, async function (err, order) {
      if (err) {
        res.status(500).json({
          error: "Something went wrong!"
        })
      }
      else res.status(200).json(order);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

//Capture
exports.capture = async (req, res) => {
  try {
    let { amount } = req.body;
    amount=parseInt(amount);
    return request(
      {
        method: "POST",
        url: `https://${process.env.KEY_ID}:${process.env.KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: amount * 100,
          currency: "INR"
        },
      },
      async function (err, response, body) {
        if (err) {
          res.status(500).json({
            error: "Something went wrong!"
          })
        }
        else {
          let uBalance = parseFloat(req.user.balance);
          uBalance = uBalance + amount;
          uBalance = uBalance.toString();
          await User.updateOne({ _id: req.user._id }, {
            $set: {
              balance: uBalance
            }
          })
          res.status(200).json(body)
        }
      }
    )
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

//Buy service
exports.buyServices = async (req, res) => {
  try {
    const { serviceId } = req.body;
    const service = await Service.findOne({ _id: serviceId });
    if (!service) res.status(400).json({ error: "Service not found!" });
    else {
      let uBalance = parseFloat(req.user.balance);
      let servicePrice = parseFloat(service.amount);
      if (uBalance >= servicePrice) {
        await Service.updateOne({ _id: serviceId }, {
          $push: {
            users: {userId:req.user._id}
          }
        })
        const artist = await Artist.findOne({ _id: service.createdBy });
        let aBalance = parseFloat(artist.balance);
        aBalance = aBalance + (servicePrice * 70.00 / 100.00);
        aBalance = aBalance.toString();
        await Artist.updateOne({ _id: artist._id }, {
          $set: {
            balance: aBalance
          }
        })
        uBalance = uBalance - servicePrice;
        uBalance = uBalance.toString();
        await User.updateOne({ _id: req.user._id }, {
          $set: {
            balance: uBalance
          }
        })
        res.status(200).json({ message: "Service added!" });
      }
      else res.status(400).json({ error: "User doesn't have enough balance!" });

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}

//Buy album
exports.buyAlbum=async (req, res) => {
  try {
    const { albumId } = req.body;
    const album = await Album.findOne({ _id: albumId });
    if (!album) res.status(400).json({ error: "Album not found!" });
    else {
      let uBalance = parseFloat(req.user.balance);
      let albumPrice = parseFloat(album.price);
      if (uBalance >= albumPrice) {
        await Album.updateOne({ _id: albumId }, {
          $push: {
            accessedBy: {userId:req.user._id}
          }
        })
        const artist = await Artist.findOne({ _id: album.postedBy });
        let aBalance = parseFloat(artist.balance);
        aBalance = aBalance + (albumPrice * 70.00 / 100.00);
        aBalance = aBalance.toString();
        await Artist.updateOne({ _id: artist._id }, {
          $set: {
            balance: aBalance
          }
        })
        uBalance = uBalance - albumPrice;
        uBalance = uBalance.toString();
        await User.updateOne({ _id: req.user._id }, {
          $set: {
            balance: uBalance
          }
        })
        res.status(200).json({ message: "Album accessed!" });
      }
      else res.status(400).json({ error: "User doesn't have enough balance!" });

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
}