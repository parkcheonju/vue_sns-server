const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const port = 8080;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

/*================ multer start ================*/

const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

/*================ multer end ================*/

/*=============== list  start ==============*/
app.post("/list", function (req, res) {
  const body = req.body;
  const { name, userImage, postImage, likes, date, liked, content, filter } = body;
  models.List.create({
    name,
    userImage,
    postImage,
    likes,
    date,
    liked,
    content,
    filter,
  })
    .then((result) => {
      console.log("게시글생성결과:", result);
      res.send({ result });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/list", function (req, res) {
  models.List.findAll({
    order: [["createdAt", "ASC"]],
    attributes: ["id", "name", "userImage", "postImage", "likes", "date", "liked", "content", "filter"],
  })
    .then((result) => {
      console.log("게시글 조회결과:", result);
      res.send({ list: result });
    })
    .catch((err) => {
      console.error(err);
      res.send("에러발생");
    });
});

app.get("/list/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.List.findOne({
    where: { id: id },
  })
    .then((result) => {
      console.log("조회결과", result);
      res.send({
        list: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("게시글조회시 에러가 발생 하였습니다.");
    });
});


/*=============== list end ===============*/

/*=============== image upload start ===============*/

app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.send({
    image: file.path,
  });
});

/*=============== image upload end ===============*/

app.listen(port, () => {
  console.log(`${port}서버 가동`);
  models.sequelize
    .sync()
    .then(function () {
      console.log("연결성공!");
    })
    .catch(function () {
      console.error("error");
      console.log("error");
      process.exit();
    });
});
