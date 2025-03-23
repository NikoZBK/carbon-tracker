import React, { ReactNode, ReactElement, isValidElement } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
}

/**
 * A reusable form field component with consistent styling and accessibility
 */
export default function FormField({
  id,
  label,
  children,
  className = '',
  required = false,
  helperText,
  error = false,
  errorMessage,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  // Generate accessible description IDs for the input
  const ariaDescribedBy =
    [helperText ? helperId : null, error && errorMessage ? errorId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  // Handle adding props to children
  const enhancedChildren = React.Children.map(children, child => {
    // Only process valid elements
    if (isValidElement(child)) {
      // Safe way to enhance the child with accessibility props
      try {
        return React.cloneElement(child as ReactElement<any>, {
          id,
          'aria-describedby': ariaDescribedBy,
          'aria-required': required || undefined,
          'aria-invalid': error || undefined,
          className: `${(child.props as any).className || ''} ${
            error ? 'border-error' : ''
          }`.trim(),
        });
      } catch (e) {
        // If cloning fails, return the original child
        console.warn(
          'Could not enhance form field child with accessibility props',
          e
        );
        return child;
      }
    }
    return child;
  });

  return (
    <div className={`mb-4 mobile-full-width ${className}`}>
      <label htmlFor={id} className="block text-caption font-medium mb-1">
        {label}
        {required && (
          <span className="text-error ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {enhancedChildren}

      {/* Helper text */}
      {helperText && (
        <div id={helperId} className="text-small mt-1 text-secondary">
          {helperText}
        </div>
      )}

      {/* Error message */}
      {error && errorMessage && (
        <div id={errorId} className="text-small mt-1 text-error">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
