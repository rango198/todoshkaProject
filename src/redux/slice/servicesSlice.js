import {createSlice} from "@reduxjs/toolkit";

import {
    addBoardThunk,
    deleteBoardThunk,
    editBoardThunk,
    fetchSingleBoard,
    getBoardThunk,
    // addColumnThunk,
} from "../thunk/servicesThunk";

const initialState = {
  boards: [],
  selectedBoard: {},
  error: null,
  isLoading: false,
  openModal: false,
  modalContent: {
    endPoint: null,
    action: null,
    recordDataEdit: null,
    recordDataAdd: null,
    editedData: null,
  },
};

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        setModalStatus: (state, action) => {
            state.openModal = action.payload;
        },
        setModalContent: (state, action) => {
            state.modalContent = {...state.modalContent, ...action.payload};
        },
        // addColumnSuccess: (state, action) => {
        //     state.columns.unshift(action.payload);
        // },

    },
    extraReducers: (builder) => {
        builder
            // /////////////PENDING////////////
            .addCase(getBoardThunk.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(addBoardThunk.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(fetchSingleBoard.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(editBoardThunk.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(deleteBoardThunk.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            // .addCase(addColumnThunk.pending, (state) => {
            //     state.error = null;
            //     state.isLoading = true;
            // })

            // //////////FULFILD///////////////////
            .addCase(getBoardThunk.fulfilled, (state, action) => {
                state.error = null;
                state.boards = [...action.payload];
                state.isLoading = false;
            })
            .addCase(addBoardThunk.fulfilled, (state, action) => {
                state.error = null;
                state.isLoading = false;
                state.boards.push(action.payload);
            })
            .addCase(fetchSingleBoard.fulfilled, (state, action) => {
                state.error = null;
                state.isLoading = false;
                if (action.payload.columns[0].hasOwnProperty("_id")) {
                    state.selectedBoard = action.payload;

                    return;
                }
                state.selectedBoard = action.payload;
                state.selectedBoard.columns = [];
            })

            .addCase(editBoardThunk.fulfilled, (state, action) => {
                state.error = null;
                state.isLoading = false;
                state.boards = action.payload.boards;
            })
            .addCase(deleteBoardThunk.fulfilled, (state, action) => {
                state.error = null;
                state.isLoading = false;
                state.boards.push(action.payload);
            })




            // .addCase(addColumnThunk.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.error = null;
            //     // Вызываем редюсер addColumnSuccess для обновления состояния
            //     serviceSlice.caseReducers.addColumnSuccess(state, action); // Используем существующий редюсер
            // })





                    // /////////////////REJECTED/////////////////
            .addCase(getBoardThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addBoardThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchSingleBoard.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(editBoardThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteBoardThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
     // .addCase(addColumnThunk.rejected, (state, action) => {
     //        state.isLoading = false;
     //        state.error = action.payload;
     //    });


    },

});

export const {setModalStatus, setModalContent,addColumnSuccess} = serviceSlice.actions;
const serviceReducer = serviceSlice.reducer;
export default serviceReducer;
