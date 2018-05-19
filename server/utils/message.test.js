var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Varun';
        var text = 'Hey';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});

    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'admin';
        var lat = 1;
        var lng = 2;
        var url = 'https://www.google.com/maps?q=1,2';
        var locationMessage = generateLocationMessage(from, lat, lng);
        
        expect(locationMessage).toInclude({from, url});
        expect(locationMessage.url).toBe(url);
    });
});