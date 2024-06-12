const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;

  for (let i = 0; i < blogs.length; i++) {
    likes += blogs[i].likes;
  }

  return likes;
};

const favouriteBlog = (blogs) => {
  let mostLiked = blogs[0];

  for (let i = 1; i < blogs.length; i++) {
    const likes = blogs[i].likes;

    if (likes > mostLiked.likes) {
      mostLiked = blogs[i];
    }
  }
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  };
};

const mostBlogsByAuthor = (blogs) => {
  const authors = {};

  blogs.forEach((blog) => {
    authors[blog.author] = (authors[blog.author] || 0) + 1;
  });

  let authorToReturn;
  let blogCount = 0;

  for (let author in authors) {
    if (authors[author] > blogCount) {
      authorToReturn = author;
      blogCount = authors[author];
    }
  }
  return { author: authorToReturn, blogs: blogCount };
};

const mostLikes = (blogs) => {
  let mostLikedAuthor = "";
  let mostLikes = 0;

  const authorLikespObject = {};

  blogs.forEach((blog) => {
    const { author, likes } = blog;

    authorLikespObject[author] = (authorLikespObject[author] || 0) + likes;

    if (authorLikespObject[author] > mostLikes) {
      mostLikedAuthor = author;
      mostLikes = authorLikespObject[author];
    }
  });

  return { author: mostLikedAuthor, likes: mostLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogsByAuthor,
  mostLikes,
};
