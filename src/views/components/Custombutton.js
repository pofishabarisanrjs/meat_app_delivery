
import React, {useState} from 'react';
import {View,Text,} from 'react-native';
import Customeselect from '../components/Customeselect';
import Cod from './Cod';
import Review from './Review';
import Completed from './Completed';
import Ongoing from './Ongoing';


export default function Custombutton() {
    const [gamesTab, setGamesTab] = useState(1);

    const onSelectSwitch = value => {
        setGamesTab(value);
      };
      return (


<View style={{width:'100%',}} >
<Customeselect
  selectionMode={1}
  option1="Ongoing"
  option2="Completed"
  option3="cod-in hand"
  option4="reviews"
  onSelectSwitch={onSelectSwitch}
  />



{gamesTab == 1 &&
<Ongoing/>
}
{gamesTab == 2 &&
<Cod/>
}
{gamesTab == 3 &&
<Completed/>
}
{gamesTab == 4 &&
 <Review/>
}

</View>
);
}