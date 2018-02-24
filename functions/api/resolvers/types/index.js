module.exports = {
  ActivityData: (_, {}) => {
    console.log(_);
    return [
      {
        id: "String",
        icon: "String",
        title: "String",
        createdAt: "Int",
        isActive: "Boolean",
        isArchived: "Boolean"
      }
    ];
  }
};
