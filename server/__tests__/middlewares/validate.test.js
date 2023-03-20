const { validRoomNameMW, validUserMW } = require("../../middlewares/validate");

const mockRequest = (headers, body) => {
    return {
        headers,
        body
    };
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("Testing validRoomNameMW", () => {
    describe("Valid results", () => {
        test("Normal room name", () => {
            const req = mockRequest({}, {name: "room"});
            const res = mockResponse();
            const next = jest.fn();
            validRoomNameMW(req, res, next);
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    
        test("After trimming, room name is valid.", () => {
            const req = mockRequest({}, {name: "  room"});
            const res = mockResponse();
            const next = jest.fn();
            validRoomNameMW(req, res, next);
            expect(req.body.name).toBe('room');
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        })
    
        test("After deleting non-alfanumeric, room name is valid.", () => {
            const req = mockRequest({}, {name: "1r:o!o~€m "});
            const res = mockResponse();
            const next = jest.fn();
            validRoomNameMW(req, res, next);
            expect(req.body.name).toBe('1room')
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        })
    
        test("Two above combined.", () => {
            const req = mockRequest({}, {name: "  1r:o!2o~€m "});
            const res = mockResponse();
            const next = jest.fn();
            validRoomNameMW(req, res, next);
            expect(req.body.name).toBe('1ro2om')
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        })
    })
    
    describe("Invalid results", () => {
        test("No name given", () => {
            const req = mockRequest({}, {name: ""})
            const res = mockResponse();
            const next = jest.fn();
            validRoomNameMW(req, res, next);
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled()
        });
    
        test("Null name given", () => {
            const req = mockRequest({}, {name: null})
            const res = mockResponse();
            const next = jest.fn();
            validRoomNameMW(req, res, next);
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled()
        });
        
        test("Name too long", () => {
            const req = mockRequest({}, {name: "ThisRoomNameIsTooLongToBeValid"})
            const res = mockResponse();
            const next = jest.fn();
            validRoomNameMW(req, res, next);
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled()
        });
    
        test("Name contains only blank spaces", () => {
            const req = mockRequest({}, {name: "     "})
            const res = mockResponse();
            const next = jest.fn();
            validRoomNameMW(req, res, next);
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled()
        });
    
        test("Name contains only non-alfanumeric", () => {
            const req = mockRequest({}, {name: "!&· $%&"})
            const res = mockResponse();
            const next = jest.fn();
            validRoomNameMW(req, res, next);
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled()
        })
    
        test("No name property given in body", () => {
            const req = mockRequest({}, {})
            const res = mockResponse();
            const next = jest.fn();
            validRoomNameMW(req, res, next);
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled()
        })
    })  
})

describe("Testing validUserMW", () => {
    describe("Valid results", () => {
        test("Normal user name", () => {
            const req = mockRequest({}, {user: "Test"});
            const res = mockResponse();
            const next = jest.fn();
            validUserMW(req, res, next);
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        })

        test("Normal user name with numbers", () => {
            const req = mockRequest({}, {user: "Test1"});
            const res = mockResponse();
            const next = jest.fn();
            validUserMW(req, res, next);
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        })

        test("User name containin only numbers, as string", () => {
            const req = mockRequest({}, {user: "123"});
            const res = mockResponse();
            const next = jest.fn();
            validUserMW(req, res, next);
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        })
    });
    
    describe("Invalid results", () => {
        test("No user given in body", () => {
            const req = mockRequest({}, {})
            const res = mockResponse();
            const next = jest.fn();
            validUserMW(req, res, next);
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled()
        });

        test("Null user given in body", () => {
            const req = mockRequest({}, {user: null})
            const res = mockResponse();
            const next = jest.fn();
            validUserMW(req, res, next);
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled()
        });
        test("Empty user given in body", () => {
            const req = mockRequest({}, {user: ""})
            const res = mockResponse();
            const next = jest.fn();
            validUserMW(req, res, next);
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled()
        });
        test("Name too long", () => {
            const req = mockRequest({}, {user: "NameTooLongForAValidUserName"})
            const res = mockResponse();
            const next = jest.fn();
            validUserMW(req, res, next);
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled()
        });
        test("Contains non-alfanumeric", () => {
            const req = mockRequest({}, {user: "User:Name"})
            const res = mockResponse();
            const next = jest.fn();
            validUserMW(req, res, next);
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled()
        });

        test("Containin only numbers, as number (not string)", () => {
            const req = mockRequest({}, {user: 123});
            const res = mockResponse();
            const next = jest.fn();
            validUserMW(req, res, next);
            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalled()
        })
    });
});