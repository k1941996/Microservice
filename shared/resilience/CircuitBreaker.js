const createCircuitBreaker = (failureThreshold = 5, resetTimeout = 60000) => {
  // Private state using closures
  let failureCount = 0;
  let lastFailureTime = null;
  let state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN

  const execute = async (operation) => {
    if (state === 'OPEN') {
      if (Date.now() - lastFailureTime > resetTimeout) {
        state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await operation();
      onSuccess();
      return result;
    } catch (error) {
      onFailure();
      throw error;
    }
  };

  const onSuccess = () => {
    failureCount = 0;
    state = 'CLOSED';
  };

  const onFailure = () => {
    failureCount++;
    lastFailureTime = Date.now();

    if (failureCount >= failureThreshold) {
      state = 'OPEN';
    }
  };

  const getState = () => {
    return {
      state,
      failureCount,
      lastFailureTime
    };
  };

  // Return the public interface
  return {
    execute,
    getState
  };
};

export default createCircuitBreaker; 