import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);
    double price = s.nextDouble();
    if (price >= 1000) {
      price *= 0.9;
    }
    else if (price >= 500) {
      price *= 0.95;
    }
    System.out.println(price);
  }
}
