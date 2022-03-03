import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Agenda,DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import { Avatar, Card, configureFonts } from 'react-native-paper';

const timeToString=(time) =>{
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};
console.log()

export default function App() {
  const [items, setItems]=useState({});

  const loadItems = (day) => {
    // const items = this.state.items || {};

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime =timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
          
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        }
      }
      
      const newItems= {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems)
    }, 1000);
  };  

  const renderItem=(reservation:AgendaEntry,isFirst:boolen)=>{
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';
return(
  <TouchableOpacity style={{marginRight:10, marginTop:17 }}>
    <Card>
      <Card.Content>
      <View style={{
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:'center'
     }}>
     <Text style={{fontSize, color}}>{reservation.name}</Text>
     <Avatar.Text label="Y"/>
   </View>

      </Card.Content>
    </Card>
  </TouchableOpacity>
)
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  }


  return (
    <View style={{flex:1}}>
    <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={new Date().toISOString().split('T')[0]}
        renderItem={renderItem}
        rowHasChanged={rowHasChanged}
         // Initially visible month. Default = now

  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2012-05-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2025-05-30'}
  // Handler which gets executed on day press. Default = undefined
  onDayPress={day => {
   console.log('selected day', day);
  }}
        />
    </View>
  );
}
