contract First {

   address creator;
   
   
   string value;
   

   function First()
   {
       creator = msg.sender;                                 

   }

    
   function setValue(string _value)
   {
       value = _value;

   }
  
   function getValue() constant returns (string)
   {
       return value;
   }
  
  
  
  
   function kill()
   {
       if (msg.sender == creator)
           suicide(creator); 
   }
  
}


