import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

const getAllUserData = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find all messages involving the user
    const messages = await Message.find({ users: { $in: [userId] } }).sort({
      createdAt: -1,
    });

    if (!messages.length) {
      return res.status(404).json({ message: "No messages found" });
    }

    // Group messages by the other user involved
    const latestMessagesMap = new Map();

    messages.forEach((message) => {
      message.users.forEach((user) => {
        if (user !== userId) {
          if (!latestMessagesMap.has(user)) {
            latestMessagesMap.set(user, message);
          }
        }
      });
    });

    // Fetch details of the other users
    const otherUserIds = Array.from(latestMessagesMap.keys());
    const otherUsers = await User.find({ _id: { $in: otherUserIds } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    // Create a map of user details by user ID for quick lookup
    const userMap = otherUsers.reduce((acc, user) => {
      acc[user._id] = user;
      return acc;
    }, {});

    // Merge the latest messages with user details
    const mergedData = Array.from(latestMessagesMap.entries()).map(
      ([userId, message]) => {
        return { ...message.toObject(), otherUserDetails: userMap[userId] };
      }
    );

    return res.json(mergedData);
  } catch (ex) {
    next(ex);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

const logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

export { login, logOut, register, getAllUsers, getAllUserData, setAvatar };

// import Message from "../models/messageModel.js";
// import User from "../models/userModel.js";
// import bcrypt from "bcrypt";

// const login = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user)
//       return res.json({ msg: "Incorrect Username or Password", status: false });
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid)
//       return res.json({ msg: "Incorrect Username or Password", status: false });
//     delete user.password;
//     return res.json({ status: true, user });
//   } catch (ex) {
//     next(ex);
//   }
// };

// const register = async (req, res, next) => {
//   try {
//     const { username, email, password } = req.body;
//     const usernameCheck = await User.findOne({ username });
//     if (usernameCheck)
//       return res.json({ msg: "Username already used", status: false });
//     const emailCheck = await User.findOne({ email });
//     if (emailCheck)
//       return res.json({ msg: "Email already used", status: false });
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       email,
//       username,
//       password: hashedPassword,
//     });
//     delete user.password;
//     return res.json({ status: true, user });
//   } catch (ex) {
//     next(ex);
//   }
// };

// const getAllUsers = async (req, res, next) => {
//   try {
//     const userId = req.params.id;

//     // Find all messages involving the user
//     const messages = await Message.find({ users: { $in: [userId] } }).sort({
//       createdAt: -1,
//     });

//     if (!messages.length) {
//       return res.status(404).json({ message: "No messages found" });
//     }

//     // Group messages by the other user involved
//     const latestMessagesMap = new Map();

//     messages.forEach((message) => {
//       message.users.forEach((user) => {
//         if (user !== userId) {
//           if (!latestMessagesMap.has(user)) {
//             latestMessagesMap.set(user, message);
//           }
//         }
//       });
//     });

//     // Fetch details of the other users
//     const otherUserIds = Array.from(latestMessagesMap.keys());
//     const otherUsers = await User.find({ _id: { $in: otherUserIds } }).select([
//       "email",
//       "username",
//       "avatarImage",
//       "_id",
//     ]);

//     // Create a map of user details by user ID for quick lookup
//     const userMap = otherUsers.reduce((acc, user) => {
//       acc[user._id] = user;
//       return acc;
//     }, {});

//     // Merge the latest messages with user details
//     const mergedData = Array.from(latestMessagesMap.entries()).map(
//       ([userId, message]) => {
//         return { ...message.toObject(), otherUserDetails: userMap[userId] };
//       }
//     );

//     return res.json(mergedData);
//   } catch (ex) {
//     next(ex);
//   }
// };

// const setAvatar = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const avatarImage = req.body.image;
//     const userData = await User.findByIdAndUpdate(
//       userId,
//       {
//         isAvatarImageSet: true,
//         avatarImage,
//       },
//       { new: true }
//     );
//     return res.json({
//       isSet: userData.isAvatarImageSet,
//       image: userData.avatarImage,
//     });
//   } catch (ex) {
//     next(ex);
//   }
// };

// const logOut = (req, res, next) => {
//   try {
//     if (!req.params.id) return res.json({ msg: "User id is required " });
//     onlineUsers.delete(req.params.id);
//     return res.status(200).send();
//   } catch (ex) {
//     next(ex);
//   }
// };

// export { login, logOut, register, getAllUsers, setAvatar };
