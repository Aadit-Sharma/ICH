import React,{useState} from "react";

import {

FlatList

} from "react-native";

import CategoryChip from "../CategoryChip/CategoryChip";

import styles from "./CategoryListStyles";

const DATA=[

{id:"1",title:"Breakfast"},

{id:"2",title:"Lunch"},

{id:"3",title:"Snacks"},

{id:"4",title:"Beverages"},

{id:"5",title:"Dinner"}

];

const CategoryList=()=>{

const[selected,setSelected]=useState("1");

return(

<FlatList

horizontal

showsHorizontalScrollIndicator={false}

contentContainerStyle={styles.list}

data={DATA}

keyExtractor={(item)=>item.id}

renderItem={({item})=>(

<CategoryChip

title={item.title}

selected={selected===item.id}

onPress={()=>setSelected(item.id)}

/>

)}

/>

);

};

export default CategoryList;