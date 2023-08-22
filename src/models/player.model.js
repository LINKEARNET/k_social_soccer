const players = (sequelize, type) => {
    return sequelize.define('players', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: type.STRING,
        lastname:type.STRING,
        photo: type.STRING,
        age: type.INTEGER, 
        cedula: type.INTEGER,
        typePlayer: type.STRING,
        goalsMarked:type.INTEGER, 

        createPlayer: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatePlayer: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = players