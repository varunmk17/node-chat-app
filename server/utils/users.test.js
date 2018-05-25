const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();

        users.users = [{
            id: 1,
            name: 'A',
            room: 'Room A'
        }, {
            id: 2,
            name: 'B',
            room: 'Room B'
        }, {
            id: 3,
            name: 'C',
            room: 'Room C'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Varun',
            room: 'Family'
        }
        var res = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove user A', () => {
        var userId = 1;
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var userId = 5;
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = 1;
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = 5;
        var user = users.getUser(userId);

        expect(user).toNotExist();
    });

    it('should return for Room C', () => {
        var userList = users.getUserList('Room C');
        expect(userList).toEqual(['C']);
    });

    it('should return for Room B', () => {
        var userList = users.getUserList('Room B');
        expect(userList).toEqual(['B']);
    });
});