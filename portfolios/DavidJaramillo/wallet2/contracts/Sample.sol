
contract Sample {
    string storedData;

	function Sample(string idUser)
	{
		storedData=idUser;
	}
    function set(string x) {
        storedData = x;
    }
    function get() constant returns (string retVal) {
        return storedData;
    }
}