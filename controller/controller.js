const { errorHandlerFunction } = require('../middleware/error');
const mockData = require('../model/model');

module.exports = {
    createmockData: async (req, res) => {
        try {
            const data = await mockData.create(req.body)
            if (data) {
                return res.success({
                    result: data,
                    msg: "Data Created Successfully..!"
                })
            } else {
                return res.clientError({ msg: 'Somthing Went Wrong in Create Data..!' })
            }

        } catch (error) {
            errorHandlerFunction(res, error)
        }

    },

    getmockData: async (req, res) => {
        try {
            const id = req.params.id
            const filter = { isDeleted: false }
            if (id) {
                filter._id = id
                const data = await mockData.findOne(filter)
                if (data) {
                    return res.success({ result: data, msg: 'Data Fetched Successfully' })
                }
                return res.clientError({ msg: 'Data Not Found' })
            }
            const data1 = await mockData.find(filter)
            if (data1) {
                return res.success({ result: data1, msg: "Data Fetched Successfully" })
            }
            return res.clientError({ msg: 'Data Not Found' })
        }
        catch (error) {
            errorHandlerFunction(res, error)
        }
    },

    updatemockData: async (req, res) => {
        try {
            const id = req.params.id
            const checkExist = await mockData.findOne({ _id: id });
            if (!checkExist) {
                return res.clientError({ msg: 'Data Not Found' });
            }
            const data = req.body
            const update = await mockData.updateOne({ _id: id }, data)
            if (update) {
                return res.success({ result: update, msg: "Data Updated successfully" })
            }
            return res.clientError({ msg: 'Update failed' })
        } catch (error) {
            errorHandlerFunction(res, error)
        }
    },

    deletemockData: async (req, res) => {
        try {
            const id = req.params.id
            const filter = { isDeleted: false }
            filter._id = id
            const checkExist = await mockData.findOne(filter);
            if (!checkExist) {
                return res.clientError({ msg: 'Data Not Found' });
            }
            const deletes = await mockData.updateOne({ _id: id }, { isDeleted: true });
            if (deletes) {
                return res.success({ result: deletes, msg: "Data Deleted Successfully" });
            }
            return res.clientError({ msg: 'Data Delete Failed' })
        } catch (error) {
            errorHandlerFunction(res, error)
        }
    },
    arrayUpdate: async (req, res) => {
        try {
            const _id = req.params.id
            const { array_id } = req.query

            const checkExist = await mockData.findOne({ _id, isDeleted: false });
            if (!checkExist) {
                return res.clientError({ msg: 'Data Not Found' });
            }

            checkExist.form.map((val) => {
                if (val._id.toString() === array_id) {
                    val.title = req.body.title
                    val.placeHolder = req.body.placeHolder
                    val.type = req.body.type
                }
            })
            await checkExist.save()
            return res.success({ msg: "Data Updated successfully" })

        } catch (error) {
            errorHandlerFunction(res, error)
        }
    },
    arrayFieldDelete: async (req, res) => {
        try {
            const _id = req.params.id
            const { array_id } = req.query

            const checkExist = await mockData.findOne({ _id, isDeleted: false });
            if (!checkExist) {
                return res.clientError({ msg: 'Data Not Found' });
            }

            const indexToRemove = checkExist.form.findIndex((val) => val._id.toString() === array_id)
            if (indexToRemove !== -1) {
                checkExist.form.splice(indexToRemove, 1)
                await checkExist.save()
                return res.success({ msg: "Form Data Deleted successfully" })
            }
            return res.clientError({ msg: "Form Data Delete Failed" })
        } catch (error) {
            errorHandlerFunction(res, error)
        }
    },

}




