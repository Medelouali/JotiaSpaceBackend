
--1
CREATE TABLE comment(
    commentId BIGSERIAL NOT NULL,
    commenterId BIGINT NOT NULL,
    content VARCHAR(1000) NOT NULL,
    PRIMARY KEY(commentId)
);

CREATE TABLE interComment(
    --interCommentId BIGSERIAL NOT NULL,
    commentInterId BIGINT NOT NULL,
    commentIdLink BIGINT NOT NULL,
    CONSTRAINT fk_interComment FOREIGN KEY(commentIdLink) REFERENCES comment(commentId),
    PRIMARY KEY(commentInterId)
);

--2
CREATE TABLE post(
    postId BIGINT NOT NULL,
    category VARCHAR(100) NOT NULL,
    posterName VARCHAR(50) NOT NULL,
    postImages BYTEA[],
    postTime DATE NOT NULL,
    postDescription VARCHAR(1000), 
    comments BIGINT,
    loves BIGINT NOT NULL DEFAULT 0,
    likes BIGINT NOT NULL DEFAULT 0,
    dislikes BIGINT NOT NULL DEFAULT 0,
    lools BIGINT NOT NULL DEFAULT 0,
    PRIMARY KEY(postId),
    CONSTRAINT fk_post FOREIGN KEY(postId) REFERENCES interComment(commentInterId)
);

--3
CREATE TABLE postInter(
    postInterId BIGINT NOT NULL PRIMARY KEY,
    postIdLink BIGINT NOT NULL,
    CONSTRAINT fk_postInter FOREIGN KEY(postIdLink) REFERENCES post(postId)
);

--4
CREATE TABLE chat(
    chatId BIGINT NOT NULL,
    senderId BIGINT NOT NULL,
    chatText TEXT NOT NULL,
    chatTime DATE NOT NULL DEFAULT CURRENT_DATE,
    chatSent BOOLEAN NOT NULL DEFAULT FALSE,
    chatReceived BOOLEAN NOT NULL DEFAULT FALSE,
    chatViewed BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY(chatId)
);

CREATE TABLE chatInter(
    chatInterId BIGINT NOT NULL PRIMARY KEY,
    chatIdLink BIGINT NOT NULL,
    CONSTRAINT fk_chatInter FOREIGN KEY(chatIdLink) REFERENCES chat(chatId)
);

--4
CREATE TABLE msg(
    msgId BIGINT NOT NULL,
    senderId BIGINT NOT NULL,
    receiverId BIGINT NOT NULL,
    chatterName VARCHAR(100) NOT NULL,
    chatterImage BYTEA NOT NULL,
    chats BIGINT,
    CONSTRAINT fk_msg FOREIGN KEY(chats) REFERENCES chatInter(chatInterId),
    PRIMARY KEY(msgId)
);

CREATE TABLE messageInter(
    messageInterId BIGINT NOT NULL PRIMARY KEY,
    messageIdLink BIGINT NOT NULL,
    CONSTRAINT fk_messageInter FOREIGN KEY(messageIdLink) REFERENCES msg(msgId)
);

CREATE TABLE client(
    userId BIGSERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    userEmail VARCHAR(100) NOT NULL,
    userOccupation VARCHAR(100) NOT NULL,
    userLocation VARCHAR(100) NOT NULL,
    userPassword TEXT NOT NULL,
    userBio TEXT DEFAULT '',
    userDescription TEXT DEFAULT '',
    userAvatar BYTEA,

    userPosts BIGINT,
    --friendsList BIGINT,
    --chattersList BIGINT,
    messages BIGINT,
    
    unreadMes BIGINT DEFAULT 0,
    unreadFri BIGINT DEFAULT 0,
    unreadNot BIGINT DEFAULT 0,
    unreadInv BIGINT DEFAULT 0,
    signUpTime DATE,
    UNIQUE(userEmail),
    CONSTRAINT fk_user_userPosts FOREIGN KEY(userPosts) REFERENCES postInter(postInterId),
    --CONSTRAINT fk_user_friendsIds FOREIGN KEY(friendsIds) REFERENCES user(userId),
    --CONSTRAINT fk_user_chattersIds FOREIGN KEY(chattersIds) REFERENCES user(userId),
    CONSTRAINT fk_user_messages FOREIGN KEY(messages) REFERENCES messageInter(messageInterId)
);