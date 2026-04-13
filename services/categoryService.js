const { Category } = require("../dao/models");


exports.createCategory = async (data) => {

    if (!data) {
        throw new Error("Request body required");
    }

    const { name } = data;

    if (!name) {
        throw new Error("name required");
    }

    const exist = await Category.findOne({ where: { name } });

    if (exist) {
        throw new Error("Category already exists");
    }

    return await Category.create({ name });
};


exports.getCategories = async () => {
    return await Category.findAll();
};


exports.getCategoryById = async (id) => {

    if (!id || isNaN(id)) {
        throw new Error("Invalid category id");
    }

    const category = await Category.findByPk(id);

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};


exports.updateCategory = async (id, data) => {

    if (!id || isNaN(id)) {
        throw new Error("Invalid category id");
    }

    if (!data || Object.keys(data).length === 0) {
        throw new Error("Request body required for update");
    }

    const { name } = data;

    if (!name) {
        throw new Error("name required for full update");
    }

    const category = await Category.findByPk(id);

    if (!category) {
        throw new Error("Category not found");
    }

    await Category.update(
        { name },
        { where: { id } }
    );

    return await Category.findByPk(id);
};


exports.patchCategory = async (id, data) => {

    if (!id || isNaN(id)) {
        throw new Error("Invalid category id");
    }

    if (!data || Object.keys(data).length === 0) {
        throw new Error("At least one field required for patch");
    }

    const category = await Category.findByPk(id);

    if (!category) {
        throw new Error("Category not found");
    }

    await Category.update(data, {
        where: { id }
    });

    return await Category.findByPk(id);
};


exports.deleteCategory = async (id) => {

    if (!id || isNaN(id)) {
        throw new Error("Invalid category id");
    }

    const deleted = await Category.destroy({
        where: { id }
    });

    if (!deleted) {
        throw new Error("Category not found");
    }

    return {
        message: "Category deleted successfully"
    };
};