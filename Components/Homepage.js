import { StyleSheet } from "react-native"
import { View, FlatList, Pressable } from "react-native"
import Card from './Card'

const Homepage = ({allItems}) =>{
    return(
        <FlatList
            style={styles.list}
            data={allItems}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            renderItem={({ item }) => (
                <Card
                    imageUrl={item.image}
                    title={item.title}
                    category={item.category}
                    description={item.description}
                    rating={item.rating}
                    price={item.price}
                    transportation={item.transportation}
                    working_hours={item.working_hours}
                    suggested_duration={item.suggested_duration}
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    list:{
        flex:1,
        padding: 8,
        backgroundColor:'#fff'
    }
})

export default Homepage