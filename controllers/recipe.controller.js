const Recipe = require('../modles/Recipe.model');
const Category = require('../modles/Category.model');
const {validationResult} = require('express-validator');
const getParentCategories = require('../utils/helpers/getParentCategories');

exports.getAll = async (req, res, next) => {
    const {category} = req.query;
    const searchParam = category ? {category} : null;
    try {
        const recipes = await Recipe.find(searchParam).exec();
        return res.status(200).json(recipes);
    } catch (error) {
        return res.status(404).json('Recipes not found')
    }
}

exports.getItem = async (req, res, next) => {
    const {getParents} = req.query;
    const {id} = req.params;
    try {
        const recipe = await Recipe.findById(id).exec();
        if (!recipe) {
            return res.status(404).json('Recipe not found')
        }
        if (getParents) {
            const category = await Category.findById(recipe.category).exec();
            if (!category) {
                return res.status(404).json('Categories not found')
            }
            const list = await getParentCategories(category);
            return res.status(200).json(list);
        } 
        return res.status(200).json(recipe);
    } catch (error) {
        next(error)
    }
}

exports.add = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json(validationErrors.array());
    }
    try {
        const recipe = await new Recipe({...req.body}).save();
        return res.status(201).json(recipe);
    } catch (error) {
        next(error)
    }
}

exports.update = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json(validationErrors.array());
    }
    try {
        const {id} = req.params;
        const recipe = await Recipe.findOneAndUpdate(
            {_id: id}, 
            {$set: {...req.body}},
            {new: true}
        ).exec();
        return res.status(201).json(recipe);
    } catch (error) {
        next(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Recipe.findByIdAndDelete(id).exec();
        return res.status(201).json(id);
    } catch (error) {
        next(error)
    }
}