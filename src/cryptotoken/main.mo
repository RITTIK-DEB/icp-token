import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor cryptotoken{

  var owner:Principal=Principal.fromText("3ekg6-eahfv-hjd3j-bohkc-voho6-igwdu-7xd2e-3gx2a-2cqpa-jndlz-lqe");
  //owner has a principal datatype and used dfx identity get-principal command to identify my self and used fromText to decript myself
  //hashmap like hashtable example= {001=>rittik,002=>swastik etc}
  var totalSuplly:Nat=1000000000;

  var symbol:Text="DANG";

  private stable var balanceEntries:[(Principal,Nat)]=[];
  //creating a stable(dont get restarted after deploying again) array 
  //whenever there is a upgrade in deployment before upgrade we will store hash maps id and amounts on array
  //after upgrade we switch array to again a hashmap
  //arrays are opearion costly so we are using hashmap
  //but hashmaps are nonstable so we are using array stabel

  private var balances=HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);
  //created a var balance to hash principal datatype to a Nat datatype intitial 1,hashed agains principal,hashed by principal.hash method

  balances.put(owner,totalSuplly);

  //put => hashed all the supply to owner intitialy

  public query func balanceOf(who:Principal):async Nat{
    let balance:Nat=switch(balances.get(who)){
      case null 0;
      case (?result) result;
    };
    
    return balance;
  };
  public query func getSymbol():async Text{
    return symbol;
  };
  public shared(msg) func payOut():async Text{
    if(balances.get(msg.caller)==null){
      // func.get is used to find if caller id is present in the hashmap if not present then allow to claim  
      let amount=10000;
    Debug.print(debug_show(msg.caller));
    let result = await transfer(msg.caller, amount);
      return result;
    }
    else{
      return "already claimed";
    }
  };
  public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
    let fromBalance = await balanceOf(msg.caller);
    //msg.caller is a id of users 
    if (fromBalance > amount) {
      let newFromBalance : Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);

      let toBalance = await balanceOf(to);
      let newToBalance = toBalance + amount;
      balances.put(to, newToBalance);

      return "Success";
    } else {
      return "Insufficient Funds"
    }
    
  };
// system keyword becaus this preupgrade(before upgrade ) and postupgrades are system functions and name is default non changable
  system func preupgrade(){
        balanceEntries := Iter.toArray(balances.entries());
        //iterating through all hashmap and coverting to array for every entries
 
  };

  system func postupgrade(){
      balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
      //creating a hashmap from array for every array vals and passing all args for defining hashmap
    if (balances.size() < 1) {
      //for first time deployment if balances dont exist or <1 that means its first time deployment no users found not even principal
      //so putting intitial
      balances.put(owner, totalSuplly);
    };
  };

  };
  


//dfx canister call token(actor name) balanceOf(func name) "( $OWNER_PUBLIC_KEY )" used this to check func on cmdline after this OWNER_PUBLIC_KEY="principal \"$( \dfx identity get-principal )\"" to save yout id as a var $owner..
