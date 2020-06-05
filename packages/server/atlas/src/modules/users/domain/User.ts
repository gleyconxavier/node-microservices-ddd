import AggregateRoot from '@core/domain/AggregateRoot';
import UniqueEntityID from '@core/domain/UniqueEntityID';
import Guard from '@core/logic/Guard';
import Result from '@core/logic/Result';

interface IUserProps {
  name: string;
  email: string;
  password: string;
}

export default class User extends AggregateRoot<IUserProps> {
  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  private constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: IUserProps, id?: UniqueEntityID): Result<User> {
    const guardedProps = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.password, argumentName: 'password' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message);
    }

    const user = new User(props, id);

    // const idWasProvided = !!id;

    // if (!idWasProvided) {
    //   user.addDomainEvent(new UserCreatedEvent(user));
    // }

    return Result.ok<User>(user);
  }
}