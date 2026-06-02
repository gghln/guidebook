const NavigationBar = () => {
    return(
        <View style={styles.container}>
            {/* Category Selector - Horizontal Scroll */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categorySelector}>
            {categories.map((category) => (
                <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                    styles.categoryButton,
                    selectedCategory === category && {borderBottomWidth: 6, borderBottomColor: '#3B5C8E'}
                ]}
                >
                <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
            ))}
            </ScrollView>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginRight:20}}>
            <Text style={{ margin: 10, color: '#A6B1C1'}}>
                Found {filteredItems.length} Place{filteredItems.length !== 1 ? 's' : ''} 
            </Text>
            </View>
        </View>
    )
}

export default NavigationBar