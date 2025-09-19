import {createSlice} from "@reduxjs/toolkit";
import {getId} from "../../utils/index.js";

const bookSlice = createSlice({
  name: "bookList",
  initialState: {
    list: [
      {
        id: 'lkowf',
        name: "三体",
        price: 59.00,
        category: "科幻小说",
        description: "刘慈欣创作的硬科幻作品，讲述了地球人类文明和三体文明的信息交流、生死搏杀及两个文明在宇宙中的兴衰历程。"
      },
      {
        id: 'andef',
        name: "JavaScript高级程序设计",
        price: 129.00,
        category: "编程技术",
        description: "前端开发经典著作，全面深入地介绍了JavaScript核心技术，涵盖ECMAScript和DOM等知识。"
      },
      {
        id: 'aefwd',
        name: "穷查理宝典",
        price: 88.00,
        category: "投资理财",
        description: "查理·芒格的智慧箴言录，全面收录了这位投资大师的公开演讲和媒体访谈，展现其思维模式和投资哲学。"
      },
      {
        id: 'iudje',
        name: "人类简史",
        price: 68.00,
        category: "历史社科",
        description: "尤瓦尔·赫拉利作品，从认知革命、农业革命到科学革命，重新诠释人类社会发展史。"
      },
      {
        id: 'cjeij',
        name: "时间简史",
        price: 45.00,
        category: "科普读物",
        description: "霍金的代表作，深入浅出地介绍了宇宙的起源、命运和最新物理学发现，探索时间与空间的本质。"
      },
    ],
  },
  reducers: {
    sort(state, {payload}) {
      state.list = state.list
        .slice()
        .sort((a, b) => {
          if (payload === "name") return a.name.localeCompare(b.name);
          if (payload === "price") return a.price - b.price;
          return 0;
        });
    },
    create(state, {payload}) {
      state.list.push({
        ...payload,
        id: getId()
      })
    },
    remove(state, {payload}) {
      state.list = state.list.filter(item => !payload.includes(item.id));
    },
    update(state, {payload}) {
      const index = state.list.findIndex(item => item.id === payload.id);
      if (index > -1) {
        state.list[index] = {...state.list[index], ...payload};
      }
    },
    setList(state, {payload}) {
      state.list = JSON.parse(JSON.stringify(payload));
    }
  }
})

export const {
  sort,
  create,
  remove,
  update,
  setList
} = bookSlice.actions;

export default bookSlice.reducer;