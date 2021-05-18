const mongoose = require('mongoose');

// connection creation and if db not available then it's create automaticle
mongoose.connect("mongodb://localhost:27017/ttchannel", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then( () => console.log('connection successfull...'))
.catch( (err) => console.log(err) )


const playListSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    ctype: {
        type: String,
        required : true,
        lowercase: true,
        enum: ["frontend", "backend", "database"]
    },
    videos: {
        type: Number,
        validate(value){
            if(value < 0){
                throw new Error('videos count should not be negative');
            }
        }
    },
    author: String,
    email: {
        type: String,
        required : true,
        lowercase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    active: Boolean,
    date : {
        type: Date,
        default : Date.now
    }
})

// collection creation
const PlayList = new mongoose.model("PlayList", playListSchema)

// create document or insert

const createDocument = async () => {
    try{
      /*  const jsPlaylist = new PlayList({
            name: "javascript",
            ctype: "Front End",
            videos: 150,
            author: "Thapa Technical",
            active: true
        })

        const mongoPlaylist = new PlayList({
            name: "mongoDB",
            ctype: "Database",
            videos: 70,
            author: "Thapa Technical",
            active: true
        })

        const expressPlaylist = new PlayList({
            name: "Express Js",
            ctype: "Back End",
            videos: 20,
            author: "Thapa Technical",
            active: true
        }) */

        const mongoosePlaylist = new PlayList({
            name: "monngode js",
            ctype: "Database",
            videos: 5,
            author: "Thapa Technical",
            email: "thapa.yo@go",
            active: true
        })
        
        //const result = await reactPlaylist.save();
        //const result = await PlayList.insertMany([jsPlaylist, mongoPlaylist, mongoosePlaylist, expressPlaylist ]);
        const result = await PlayList.insertMany([ mongoosePlaylist ]);
        console.log(result);
    } catch(err){
        console.log(err);
    }
    
}

createDocument();

const getDocument = async () => {
    try{
        const result = await PlayList
        //.find({ ctype: { $nin : ["Back End", "Database"]}})
        .find({author: "Thapa Technical"})
        .select({name : 1})
        .sort({name : -1});
        //.countDocuments();
        //.limit(1);
        console.log(result)
    } catch(err){
        console.log(err);
    }
}

//getDocument();


const deleteDocument = async (_id) => {
    try{
        const result = await PlayList.deleteOne( {_id} );
        console.log(result);
    } catch(err){
        console.log(err);
    }
}

//deleteDocument('60631a22f392486ef83d444a');





