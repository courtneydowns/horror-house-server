const { DataTypes, where, Op, Model } = require("sequelize");
const sequelize = require("../db");

class Review extends Model {
  /*ADD LIKE TO REVIEW*/
  addUpvote(userId) {
    if (this.voters.includes(userId)) {
      return -1;
    }
    this.voters.push(userId);
    this.upvotes++;
    this.purifyVoters();
    return this.upvotes;
  }

  /*REMOVE LIKE FROM REVIEW*/
  removeUpvote(userId) {
    if (!this.voters.includes(userId)) {
      return -1;
    }
    this.voters = this.voters.filter((id) => id !== userId);
    this.upvotes--;
    this.purifyVoters();
    return this.upvotes;
  }
  /*REMOVES DUPLICATES, SORTS, REMOVES FALSY VALUES*/
  purifyVoters() {
    const arr = this.voters;
    this.voters = [...new Set(arr.sort((a, b) => a - b).filter((v) => v))];
  }
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: { type: DataTypes.TEXT, allowNull: false },
    childOf: DataTypes.INTEGER,
    upvotes: { type: DataTypes.INTEGER, defaultValue: 0 },
    voters: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
    details: { type: DataTypes.JSONB, defaultValue: {} },
  },
  {
    sequelize,
    modelName: "like_review",
    hooks: {
      beforeCreate: async (review, options) => {
        review.voters = [];
        review.addUpvote(review.reviewAuthor);
      },
    },
  }
);

module.exports = Review;
