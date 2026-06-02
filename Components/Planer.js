import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Import the icon library
import PlanItem from './PlanItem'

const Planner = ({plan, setPlan}) => {
  return (
    <ScrollView style={styles.outerContainer}>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginHorizontal:10, marginVertical:20}}>
        <Text style={{alignSelf:'flex-start', fontWeight:500, fontSize:18, color:'#4F6D9A'}}>Sounds like a Plan!</Text>
        <TouchableOpacity
            onPress={async () => {
              try {
                await AsyncStorage.removeItem('plan'); // use the correct key
                setPlan({}); // optionally reset local state too
                console.log('Planner cleared');
              } catch (e) {
                console.error('Failed to clear the plan', e);
              }
            }}
          >
          <Icon name='delete' size={24} color='#778BA5'/>
        </TouchableOpacity>
      </View>


    {Object.keys(plan)
      .map(dateString => new Date(dateString)) // Convert to Date objects
      .sort((a, b) => a - b) // Sort chronologically
      .map(date => {
        const dateString = date.toDateString();
        const attractionsForDate = plan[dateString];
        
        // Calculate total for this day
        const totalPrice = attractionsForDate.reduce((sum, attraction) => {
        const price = parseFloat(attraction.price); // "18 EUR" → 18
          return sum + (isNaN(price) ? 0 : price); // fallback to 0 if price isn't valid
        }, 0);


        return (
          <View key={dateString} style={{ margin: 10}}>
            <Text style={styles.heading}>{dateString}</Text>

            {attractionsForDate.map((attraction, index) => (
              // <View key={index} style={[styles.container, { opacity: visibility ? 1 : 0.3, transition: 'opacity 0.3s ease' }]}>
              //   <View style={{flexDirection:'row', gap:10}}>
              //   <Image source={{ uri: attraction.image }} style={styles.image} />
              //   <View style={{gap:2}}>
              //     <Text style={styles.title}>{attraction.title}</Text>
              //     <Text style={styles.price}>{attraction.price}</Text>
              //     <Text style={styles.description}>Suggested for <Text style={{color:'#3B5C8E', fontWeight:700}}>{attraction.duration}</Text></Text>
              //   </View>
              //   </View>
              //   {visibility ? (
              //     <TouchableOpacity style={{flexDirection:'row',alignSelf:'flex-end', marginRight:10, paddingBottom:8}} onPress={() => toggleVisibility(dateString, index)}>
              //       <Icon name='visibility' size={18} style={{color:'#A6B1C1'}}/>
              //     </TouchableOpacity>
              //   ) : (
              //     <TouchableOpacity style={{flexDirection:'row',alignItems:'center',alignSelf:'flex-end',marginRight:10 ,paddingBottom:8}} onPress={() => toggleVisibility(dateString, index)}>
              //       <Text style={styles.description}>Visited</Text>
              //     </TouchableOpacity>
              //   )}
              // </View>

              <PlanItem key={index} attraction={attraction}/>
            ))}

            <View style={{alignSelf:'flex-end'}}>
              <Text style={styles.total}>
                Total cost: {totalPrice} EUR
              </Text>
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  outerContainer:{
    backgroundColor:'#ffffff',
    marginBottom:50
  },
  container:{
    flexDirection: 'row',
    justifyContent:'space-between',
    backgroundColor: '#fff',
    margin: 8,
    marginBottom: 10,
    padding: 4,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
    heading: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 15,
    color: '#3B5C8E',
    padding: 5,
    borderBottomWidth:1,
    borderBottomColor:'#A6B1C1'
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 1,
    color: '#3B5C8E',
  },
  price: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 1,
    color: '#4F6D9A',
  },
  category: {
    fontWeight: '500',
    fontSize: 14,
    color: '#A6B1C1',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#A6B1C1',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F6D9A', // Gold color for rating
  },
  total:{
    fontSize:12,
    fontWeight:400,
    color:'#A6B1C1',
    marginRight:12
  }
})

export default Planner;
