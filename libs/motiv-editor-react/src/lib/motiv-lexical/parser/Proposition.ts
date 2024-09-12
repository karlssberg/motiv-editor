import { ParameterInfo, PrimitiveTypeNames } from 'motiv-editor-react';

const parameterPattern = /(?:[{]"(?:[^"]|\\")*"[}]|[{](?:[^}])*[}])?/g;

export class Proposition {
  public id: string;
  public template: string;
  public parameters: Record<string, ParameterInfo>;
  public templateParts: string[];
  public static parameterPattern = parameterPattern;
  public static propositionPattern =
    /[\p{L}_](?:[\p{L}\-_]+(?:[{]"(?:[^"]|\\")*"[}]|[{](?:[^}])*[}])?)+/u;

  public static normalizeProposition(proposition: string): string {
    return proposition.replace(parameterPattern, '');
  }

  constructor(
    id: string,
    template: string,
    parameters: { [parameterName: string]: ParameterInfo } = {}
  ) {
    this.id = id;
    this.template = template;
    this.parameters = parameters;
    this.templateParts = this.splitTemplate(template);
  }

  validateExpression(candidate: string): [boolean, string[]] {
    const candidateParts = this.splitTemplate(candidate);
    const errors: string[] = [];
    let processedCandidate = '';

    for (let i = 0; i < this.templateParts.length; i++) {
      const templatePart = this.templateParts[i];
      const candidatePart = candidateParts[i];
      if (!candidatePart) {
        errors.push(
          `Invalid token. Expecting to find "${templatePart}" at the end of "${candidate}".`
        );
        break;
      }

      if (isParameter(templatePart)) {
        const parameterName = extractParameterName(templatePart);
        const parameterValue = extractParameterName(candidatePart);
        const expectedParameterType = this.parameters[parameterName].type;
        if (!validateParameter(parameterValue, expectedParameterType)) {
          errors.push(
            `Expected parameter "${parameterName}" to be of type "${expectedParameterType}", but got "${parameterValue}"`
          );
        }
      } else if (templatePart !== candidatePart) {
        errors.push(`Expected "${templatePart}" but got "${candidatePart}"`);
      }
      processedCandidate += candidatePart;
    }
    return [errors.length === 0, errors];

    function isParameter(part: string): boolean {
      return part.startsWith('{') && part.endsWith('}');
    }

    function extractParameterName(part: string): string {
      return part.substring(1, part.length - 1);
    }
  }

  private splitTemplate(template: string): string[] {
    return template
      .split(captureParameterPattern)
      .filter((part) => part !== '');
  }
}

function captureExpression(regex: RegExp, flags?: string): RegExp {
  return new RegExp(`(${regex.source})`, flags ?? regex.flags);
}
const captureParameterPattern = captureExpression(parameterPattern);

function isInteger(candidate: string): boolean {
  return /^\d+$/.test(candidate);
}

function isDecimal(candidate: string): boolean {
  return /^\d+(\.\d+)?$/.test(candidate);
}

function isDateTime(candidate: string): boolean {
  return new Date(candidate).toString() !== 'Invalid Date';
}

function isQuotedString(candidate: string): boolean {
  return /^"[^"]*"$/.test(candidate);
}

function validateParameter(
  value: string,
  type?: `${PrimitiveTypeNames}`
): boolean {
  const normalizedValue = value.trim();
  switch (type) {
    case PrimitiveTypeNames.Decimal:
      return isDecimal(normalizedValue);
    case PrimitiveTypeNames.String:
      return isQuotedString(normalizedValue);
    case PrimitiveTypeNames.DateTime:
      return isDateTime(normalizedValue);
    case PrimitiveTypeNames.Integer:
      return isInteger(normalizedValue);
    default:
      return false;
  }
}
