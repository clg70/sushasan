import Types "../Types";
import HashIt "HashIt";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Budget "Budget";
module {

  type ResponseRegister = {
    user : Types.User;
    property : Types.Property;
  };

  public func register(users : Types.Users, properties : Types.Properties, id : Text, regNo : Text, owner : Text, valuation : Int, lat : Int, lon : Int, propertyType : Text, createdAt : Text) : async ?ResponseRegister {
    switch (properties.get(await HashIt.hash(regNo))) {
      case (?_) {
        null;
      };
      case (null) {
        switch (users.get(owner)) {
          case (?user) {
            let newProperty : Types.Property = {
              id = await HashIt.hash(id);
              regNo = await HashIt.hash(regNo);
              owner = user;
              valuation = valuation;
              lat = lat;
              lon = lon;
              propertyType = propertyType;
              transactionReceipt = "Newly created";
              createdAt = createdAt;
            };

            let properties = HashMap.fromIter<Text, Types.Property>((user.properties).vals(), 0, Text.equal, Text.hash);

            properties.put(newProperty.regNo, newProperty);

            let updatedUser : Types.User = {
              id = user.id;
              username = user.username;
              password = user.password;
              name = user.name;
              czid = user.czid;
              role = user.role;
              balance = user.balance;
              nid = user.nid;
              transactions = user.transactions;
              budgets = user.budgets;
              properties = Iter.toArray(properties.entries());
              createdAt = user.createdAt;
            };

            return ?{
              user = updatedUser;
              property = newProperty;
            };
          };
          case (null) { null };
        };

      };
    };
  };

  public type PropertyTransactionResponse = {
    owner : Types.User;
    buyer : Types.User;
    transaction : Types.Transaction;
    property : Types.Property;
  };

  public func propertyTransaction(users : Types.Users, properties : Types.Properties, owner : Text, buyer : Text, amount : Int, createdAt : Text, regNo : Text, tid : Text) : async ?PropertyTransactionResponse {
    switch (properties.get(regNo)) {
      case (?property) {
        switch (users.get(owner)) {
          case (?ownr) {
            switch (users.get(buyer)) {
              case (?byr) {

                let response = await Budget.budgetToProvince(users, ownr.id, byr.id, amount, "Land sold to " # byr.name # " by " # ownr.name, createdAt, createdAt, tid);

                switch (response) {
                  case (?res) {
                    let updatedProperty : Types.Property = {
                      id = property.id;
                      owner = byr;
                      regNo = property.regNo;
                      valuation = amount;
                      lat = property.lat;
                      lon = property.lon;
                      propertyType = property.propertyType;
                      transactionReceipt = (res.transaction).id;
                      createdAt = property.createdAt;
                    };

                    var ownerProperties = HashMap.fromIter<Text, Types.Property>((ownr.properties).vals(), 0, Text.equal, Text.hash);

                    let buyerProperties = HashMap.fromIter<Text, Types.Property>((byr.properties).vals(), 0, Text.equal, Text.hash);

                    ownerProperties.delete(property.regNo);
                    buyerProperties.put(property.regNo, updatedProperty);

                    let updatedBuyer : Types.User = {
                      id = res.from.id;
                      username = res.from.username;
                      password = res.from.password;
                      name = res.from.name;
                      nid = res.from.nid;
                      czid = res.from.czid;
                      role = res.from.role;
                      balance = res.from.balance;
                      transactions = res.from.transactions;
                      budgets = res.from.budgets;
                      properties = Iter.toArray(buyerProperties.entries());
                      createdAt = res.from.createdAt;
                    };

                    let updatedOwner : Types.User = {
                      id = res.to.id;
                      username = res.to.username;
                      password = res.to.password;
                      name = res.to.name;
                      nid = res.to.nid;
                      czid = res.to.czid;
                      role = res.to.role;
                      balance = res.to.balance;
                      transactions = res.to.transactions;
                      budgets = res.to.budgets;
                      properties = Iter.toArray(ownerProperties.entries());
                      createdAt = res.to.createdAt;
                    };

                    return ?{
                      owner = updatedOwner;
                      buyer = updatedBuyer;
                      transaction = res.transaction;
                      property = updatedProperty;
                    };
                  };
                  case (null) { null };
                };

              };
              case (null) { null };
            };
          };
          case (null) { null };
        };
      };
      case (null) { null };
    };
  };
};
