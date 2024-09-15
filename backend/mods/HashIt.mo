import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";

module {
    public func hash(string: Text): async Text{
        return Nat32.toText(Text.hash(string));
    };
};