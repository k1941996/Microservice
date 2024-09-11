import React, { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { MdCheckCircleOutline, MdErrorOutline, MdWarningAmber, MdInfoOutline } from "react-icons/md";
import { v4 as uuid } from "uuid";

const ToasterContext = createContext();


const Toast = (props) => {
  const { message, type, id } = props;
  const timerID = useRef(null); // create a Reference
  const toast = useToast();

  const handleDismiss = () => {
    toast.remove(id);
  };

  useEffect(() => {
    timerID.current = setTimeout(() => {
      handleDismiss();
    }, 4000);
    return () => {
      clearTimeout(timerID.current);
    };
  }, []);
  const renderToasterIcon = () => {
    switch (type) {
      case "success":
        return <MdCheckCircleOutline color="white" fontSize={24} />;
      case "error":
        return <MdErrorOutline color="white" fontSize={24} />;
      case "warning":
        return <MdWarningAmber color="white" fontSize={24} />;
      case "info":
        return <MdInfoOutline color="white" fontSize={24} />;

      default:
        break;
    }
  };
  return (
    <div className={`alert alert-${type}`}>
      {renderToasterIcon()}
      <span>{message}</span>
    </div>
  );
};
const ToastContainer = (props) => {
  const { toasts } = props;
  return (
    <div className="toast toast-end">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

const initialState = {
  toasts: [],
};
const toastReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case "DELETE_TOAST":
      const updatedToasts = state.toasts.filter((toast) => toast.id !== action.payload);
      return {
        ...state,
        toasts: updatedToasts,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const ToasterContextProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (type, message) => {
    const id = uuid();
    dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
  };

  const success = (message) => {
    addToast("success", message);
  };
  const warn = (message) => {
    addToast("warning", message);
  };
  const error = (message) => {
    addToast("error", message);
  };
  const info = (message) => {
    addToast("info", message);
  };
  const remove = (id) => {
    dispatch({ type: "DELETE_TOAST", payload: id });
  };
  const value = { success, warn, error, info, remove };
  return (
    <ToasterContext.Provider value={value}>
      <ToastContainer toasts={state.toasts} />

      {children}
    </ToasterContext.Provider>
  );
};

export const useToast = () => useContext(ToasterContext);

export default ToasterContextProvider;
