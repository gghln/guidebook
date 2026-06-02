import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const Card = ({ imageUrl, title, category, description, rating, price, suggested_duration }) => {

  return (
    <View style={styles.cardContainer}>
      <Image source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.category}>{category}</Text>
          </View>
          <Text style={styles.price}>{price}</Text>
        </View>

        <View style={styles.descContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <Icon name="save" size={12} style={{ color: '#A6B1C1' }} />
            <Text style={{ fontSize: 12, fontWeight: '400', color: '#A6B1C1' }}>
              Added to Schedule
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Icon name="star" size={20} color="#4F6D9A" />
            <Text style={styles.rating}>{rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 10,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 240,
    borderRadius: 10,
  },
  cardDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  descContainer: {
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 1,
    color: '#3B5C8E',
  },
  price: {
    fontWeight: '700',
    fontSize: 16,
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
    fontSize: 14,
    color: '#5C6B82',
    marginBottom: 5,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F6D9A',
  },
});

export default Card