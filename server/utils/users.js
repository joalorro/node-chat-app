const users = [{
	id: '',
	name: '',
	room: ''
}]

// add user (id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
	constructor(){
		this.users = []
		this.getUser = this.getUser.bind(this)
	}

	addUser(id,name,room){
		let user = { id, name, room}
		this.users.push(user)
		return user
	}

	getUser(id){
		return this.users.find( u => u.id == id)
	}

	removeUser(id){
		const user = this.getUser(id)
		if (!user) return undefined
		this.users.splice( this.users.indexOf(user), 1 )
		return user
	}


	getUserList(room){
		const users = this.users.filter( u => u.room === room)
		return users.map( u => u.name )
	}
}

module.exports = { Users }