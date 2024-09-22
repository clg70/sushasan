import Types "../Types";
import HashIt "HashIt";

module {
  public func register(users : Types.Users, username : Text, password : Text, name : Text, nid : Text, czid : Text, role : Text, createdAt : Text) : async ?Types.User {
    let hashedUsername = await HashIt.hash(username);
    switch (users.get(hashedUsername)) {
      case (?_) {
        return null;
      };
      case (null) {
        let newUser : Types.User = {
          id = hashedUsername;
          username = username;
          password = await HashIt.hash(password);
          name = name;
          nid = nid;
          czid = czid;
          role = role;
          balance = 0;
          transactions = [];
          budgets = [];
          properties = [];
          createdAt = createdAt;
        };
        return ?newUser;
      };
    };
  };

  public func login(users : Types.Users, username : Text, password : Text) : async Text {
    switch (users.get(await HashIt.hash(username))) {
      case (?user) {
        if (user.password == (await HashIt.hash(password))) {
          return user.id;
        };
        return "401";
      };
      case (null) {
        return "404";
      };
    };
  };

  public func getUser(users : Types.Users, token : Text) : async ?Types.User {
    switch (users.get(token)) {
      case (?value) {
        return ?value;
      };
      case (null) {
        return null;
      };
    };
  };

  public func registerDept(users : Types.Users, username : Text, password : Text, name : Text, role : Text, createdAt : Text) : async Types.User {
    let hashedUsername = await HashIt.hash(username);
    switch (users.get(hashedUsername)) {
      case (?value) {
        return value;
      };
      case (null) {
        let newUser : Types.User = {
          id = hashedUsername;
          username = username;
          password = await HashIt.hash(password);
          name = name;
          nid = "";
          czid = "";
          role = role;
          balance = 0;
          transactions = [];
          budgets = [];
          properties = [];
          createdAt = createdAt;
        };
        return newUser;
      };
    };
  };
};
