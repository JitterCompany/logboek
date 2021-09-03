const elasticlunr = require("elasticlunr");

module.exports = function (collection) {

  // console.log("searchFilter: ", collection);

  // what fields we'd like our index to consist of
  var index = elasticlunr(function () {
    this.addField("title");
    this.addField("tags");
    this.addField("body");
    this.setRef("id");
  });

  var i = 0;
  // loop through each page and add it to the index
  collection.forEach((page) => {
    if (i == 2) {
      console.log('page:', page.template.frontMatter);
      i++;
    }
    index.addDoc({
      id: page.url,
      title: page.template.frontMatter.data.title,
      tags: page.template.frontMatter.data.tags,
      body: page.template.frontMatter.content
    });
  });

  return index.toJSON();
};