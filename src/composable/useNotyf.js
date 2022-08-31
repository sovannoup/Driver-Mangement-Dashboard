import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

export default function useNotyf() {
    return {
      success: (message) => {
        notyf.success(message)
      },
      error: (message) => {
        notyf.error(message)
      },
    }
  }
  