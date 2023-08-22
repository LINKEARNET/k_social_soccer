const users =(sequelize, type) =>{
    return sequelize.define('users', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email:type.STRING ,
        password: type.STRING,
        name:type.STRING ,
        lastName:type.STRING,  
        profile_image: type.STRING,
        description:type.STRING,

        createUsers:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateUsers:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = users
