import { SelectQueryBuilder } from 'typeorm';

export class ApiFeature {
  private query: SelectQueryBuilder<any>;
  private queryParams: any;

  constructor(query: SelectQueryBuilder<any>, queryParams: any) {
    this.query = query;
    this.queryParams = queryParams;
  }

  filter() {
    const filters = this.queryParams.filter;

    if (filters && Array.isArray(filters)) {
      filters.forEach((condition: any) => {
        const { field, operator } = condition;
        let value = condition.value;

        // Check if the field is 'admin' and ensure it's treated as a boolean
        if (field === 'admin') {
          if (typeof value === 'string') {
            // Explicitly convert string 'true'/'false' to boolean
            condition.value = value.toLowerCase() === 'true' ? true : false;
          }

          // Ensure the query compares boolean values correctly
          this.query.andWhere(`${field} = :value`, { value: condition.value });
        } else {
          switch (operator) {
            case 'like':
              this.query.andWhere(`${field} LIKE :value`, {
                value: `%${value}%`,
              });
              break;

            case 'eq': // Ensure 'eq' operator is treated as SQL equality operator
              this.query.andWhere(`${field} = :value`, { value });
              break;

            case 'not':
              this.query.andWhere(`${field} != :value`, { value });
              break;

            case 'in':
              if (!Array.isArray(value)) {
                value = [value]; // Ensure it's an array if it's not
              }
              this.query.andWhere(`${field} IN (:...values)`, {
                values: value,
              });
              break;

            case 'gte':
              this.query.andWhere(`${field} >= :value`, { value });
              break;

            case 'lte':
              this.query.andWhere(`${field} <= :value`, { value });
              break;

            case 'gt':
              this.query.andWhere(`${field} > :value`, { value });
              break;

            case 'lt':
              this.query.andWhere(`${field} < :value`, { value });
              break;

            default:
              throw new Error(`Unsupported operator: ${operator}`);
          }
        }
        console.log('Condition Value:', condition.value);
        console.log('Generated Query:', this.query.getQueryAndParameters());
      });
    }

    return this;
  }

  paginate() {
    const page = parseInt(this.queryParams.page, 10) || 1;
    const limit = parseInt(this.queryParams.limit, 10) || 10;
    const skip = (page - 1) * limit;

    this.query.skip(skip).take(limit);
    return this;
  }

  getQuery() {
    return this.query;
  }
}
