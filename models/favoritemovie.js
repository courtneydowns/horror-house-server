const { DataTypes, where, Op, Model } = require("sequelize");
const sequelize = require("../db");
class Movie extends Model {
  /*ADD LIKE TO FAVORITE*/
  addUpvote(userId) {
    if (this.voters.includes(userId)) {
      return -1;
    }
    this.voters.push(userId);
    this.upvotes++;
    this.purifyVoters();
    return this.upvotes;
  }

  /*REMOVE LIKE FROM FAVORITE*/
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

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    favoriteAuthor: {
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
    modelName: "favorite_movie",
    hooks: {
      beforeCreate: async (movie, options) => {
        movie.voters = [];
        movie.addUpvote(movie.favoriteAuthor);
      },
    },
  }
);

module.exports = Movie;
